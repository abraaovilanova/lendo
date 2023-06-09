export function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    var matrix = [];

    // Initialize the matrix
    for (var i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (var j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (var k = 1; k <= b.length; k++) {
        for (var l = 1; l <= a.length; l++) {
            if (b.charAt(k - 1) === a.charAt(j - 1)) {
                matrix[k][l] = matrix[k - 1][l - 1];
            } else {
                matrix[k][l] = Math.min(
                    matrix[k - 1][l - 1] + 1, // substitution
                    Math.min(
                        matrix[k][l - 1] + 1, // insertion
                        matrix[k - 1][l] + 1 // deletion
                    )
                );
            }
        }
    }

    return matrix[b.length][a.length];
}


export function similarityInPercent(maxLength, distance) {
    return (maxLength - distance) / maxLength * 100
}

export function similarityCheck(text, transcript) {
    
    let formatedText = text.toLowerCase()
    .replace(",", "")
    .trim()
    
    var distance = levenshteinDistance(formatedText, transcript);
    var maxLength = Math.max(formatedText.length, transcript.length);
    return similarityInPercent(maxLength, distance);
}