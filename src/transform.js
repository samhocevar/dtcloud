function walk(node)
{
    switch (node.nodeType)
    {
        case Node.TEXT_NODE:
            transform(node);
            break;
        case Node.ELEMENT_NODE:
        case Node.DOCUMENT_NODE:
        case Node.DOCUMENT_FRAGMENT_NODE:
            for (var n = node.firstChild; n; n = n.nextSibling)
                walk(n);
            break;
        default:
            // Do nothing with unknown nodes
            break;
    }
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

walk(document.body);

