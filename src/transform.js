
// Some stats to detect whether we’re dealing with French
var is_french = false;

var words = [ 'de', 'des', 'du', 'en', 'et', 'le', 'la', 'les', 'un', 'une' ];
var letters = [ 'é', 'è', 'à', 'ù', 'ė' ];

var word_count = {};
var letter_count = {};

for (var i in words)
    word_count[words[i]] = 0;

for (var i in letters)
    letter_count[letters[i]] = 0;



function walk(node, fun)
{
    switch (node.nodeType)
    {
        case Node.TEXT_NODE:
            fun(node);
            break;
        case Node.ELEMENT_NODE:
        case Node.DOCUMENT_NODE:
        case Node.DOCUMENT_FRAGMENT_NODE:
            for (var n = node.firstChild; n; n = n.nextSibling)
                walk(n, fun);
            break;
        default:
            // Do nothing with unknown nodes
            break;
    }
}

function stats(node)
{
    var v = node.nodeValue.toLowerCase();

    for (var i in words)
        word_count[words[i]] += (v.match(new RegExp('\\b' + words[i] + '\\b', 'g')) || []).length;

    for (var i in letters)
        letter_count[letters[i]] += (v.match(new RegExp(letters[i], 'g')) || []).length;
}

function transform(node)
{
    var v = node.nodeValue;

    v = v.replace(/\b([cC])loud ([cC])omputing\b/g, "$2omputing de ton $1ul");

    v = v.replace(/\ble ([cC])loud\b/g, "ton $1ul");
    v = v.replace(/\bLe ([cC])loud\b/g, "Ton $1ul");

    v = v.replace(/\b([dD])u ([cC])loud\b/g, "$1e ton $2ul");

    v = v.replace(/\b([cC])loud\b/g, "ton $1ul");

    if (v != node.nodeValue)
        node.nodeValue = v;
}

walk(document.body, stats);

var good_words = 0;
var good_letters = 0;
for (var i in Object.keys(word_count))
    if (word_count[words[i]] > 5)
        ++good_words;
for (var i in Object.keys(letter_count))
    if (letter_count[letters[i]] > 5)
        ++good_letters;

if (good_words * 2 > words.length || good_letters * 2 > letters.length)
    walk(document.body, transform);

