d = {}

def addWord(word, dictionary):
    """docstring for addWord"""
    
    if len(word) == 1:
        dictionary[word] = { 'IW' : True, 'SD': {} }
    elif len(word) > 1:
        c = word[0]
        if c not in dictionary:
            dictionary[c] = { 'IW' : False, 'SD': {} }
        addWord(word[1:], dictionary[c]['SD'])

def isWord(word, dictionary):
    """docstring for isWord"""
    
    if len(word) == 1:
        if word in dictionary:
            return dictionary[word]['IW']
        else:
            return False
    elif len(word) > 1:
        c = word[0]
        if c in dictionary:
            return isWord(word[1:], dictionary[c]['SD'])
        else:
            return False

with open('words.txt') as f:
    words = f.read().split('\n')
for x in words:
    addWord(x,d)