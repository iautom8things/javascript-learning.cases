/*globals $, BOGGLE, console*/
BOGGLE.dict = (function () {
    var wordlist, 
        len, i, 
        dict = {};

    function addWord (word, dictionary) {
        var len = word.length,
            c;
        
        dictionary = dictionary || dict;
        if (len === 1) {
            dictionary[word] = { 'isWord' : true, 'sub' : {}};
        }
        else if (len > 1) {
            c = word[0];
            if (!dictionary.hasOwnProperty(c)) {
                dictionary[c] = { 'isWord': false, 'sub' : {}};
            }
            addWord(word.substring(1), dictionary[c].sub);
        }
    }

    function isWord (word, dictionary) {
        var len = word.length,
            result = false, 
            c;
        
        dictionary = dictionary || dict;
        if (len === 1) {
            if (dictionary.hasOwnProperty(word)) {
                result = dictionary[word].isWord;
            }
            else {
                result = false;
            }
        }
        else if (len > 1) {
            c = word[0];
            if (dictionary.hasOwnProperty(c)) {
                result = isWord(word.substring(1), dictionary[c].sub);
            }
            else {
                result = false;
            }
        }
        return result;
    }

    function isPrefix (prefix, dictionary) {
        var len = prefix.length,
            result = false, 
            c;
        
        dictionary = dictionary || dict;
        if (len === 1) {
            if (dictionary.hasOwnProperty(prefix)) {
                result = true;
            }
            else {
                result = false;
            }
        }
        else if (len > 1) {
            c = prefix[0];
            if (dictionary.hasOwnProperty(c)) {
                result = isPrefix(prefix.substring(1), dictionary[c].sub);
            }
            else {
                result = false;
            }
        }
        return result;
    }
    
    $.getJSON('json/dictionary', function (data) {
        len = data.length;

        for (i = 0; i < len; i += 1) {
            addWord(data[i], dict);
        }
    });
    
    return {
        // API of dictionary
        isWord : isWord,
        isPrefix : isPrefix
    };
}());
