from flask import Flask, request, jsonify

from transformers import pipeline

from flask_cors import CORS
# Initialize the Flask app
app = Flask(__name__)


# Enable CORS
CORS(app)


# Load the toxic-BERT model
moderation_model = pipeline("text-classification", model="unitary/toxic-bert", return_all_scores=True)

# Function to mask toxic words in a sentence
def mask_toxic_words(sentence, threshold=0.7):
    words = sentence.split()  # Split sentence into words
    masked_sentence = []
    contains_toxic_word = False  # Flag to track toxic words

    # Analyze each word for toxicity
    for word in words:
        result = moderation_model(word)
        toxic_score = next((score["score"] for score in result[0] if score["label"] == "toxic"), 0)
        
        # Mask word if it exceeds the threshold
        if toxic_score >= threshold:
            masked_sentence.append("*")
            contains_toxic_word = True
        else:
            masked_sentence.append(word)

    return " ".join(masked_sentence), contains_toxic_word

# Define an API endpoint for toxic word detection
@app.route('/mask-toxic', methods=['POST'])
def mask_toxic():
    data = request.json
    sentence = data.get("sentence", "")

    # Mask toxic words and check for toxicity
    masked_sentence, contains_toxic_word = mask_toxic_words(sentence)

    # Return response
    if contains_toxic_word:
        return jsonify({"success": False, "message": "Toxic words detected.", "masked_sentence": masked_sentence})
    return jsonify({"success": True, "masked_sentence": masked_sentence})

# Run the Flask app
if __name__ == '__main__':
    app.run(host="localhost", port=5234)
