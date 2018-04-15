//TODO: break this data out of this file

//4 themes
// with at least 3 lines
//11 poems

var PoemData = {

    //A Theme is a String title
    //and a collection of strings representing lines that represent that theme, along with the id of the poem that they came from
    //current id = index in the poems array (this is bad but temporary)
    themes : [
        {
            title: "birth",
            lines: [
                {line: "Unless it comes out of your soul like a rocket, unless being still would drive you to madness or suicide or murder, don’t do it.", poemNum: 1},
                {line: "Remember your birth, how your mother struggled to give you form and breath. You are evidence of her life, and her mother’s, and hers.", poemNum: 2},
                {line: "I am an immediate symbol of a war folks have been fighting eons-deep before I was born, a meteor.", poemNum: 3},
            ]
        },
        {
            title: "anxiety",
            lines: [
                {line: "How long can I let my mind moulder in this place?", poemNum: 4},
                {line: "We hesitate to say what intimacy is and whether or not we have it.", poemNum: 5},
                {line: "I’m terrified to break into sprint across to free myself, to free them from the myth they make of me", poemNum: 6},
                {line: "I worry that my friends will misunderstand my silence as a lack of love, or interest, instead of a tent city built for my own mind", poemNum: 3},
                {line: "Our mothers burn with a fire that does not let them be", poemNum: 7},
            ]
        },
        {
            title: "hope",
            lines: [
                {line: "I love you, she said. She didn’t know me, but I believed her.", poemNum: 8},
                {line: "and i am learning to hope like a bird learns its first affair with wind and sun.", poemNum: 9},
                {line: "Trust the hours. Haven’t they carried you everywhere, up to now?", poemNum: 10},
                {line: "So here’s the view, the breeze, the pulse in your throat.", poemNum: 11},
                {line: "Fill me with light, fill me with sun-like strength.", poemNum: 12},
            ]
        },
        {
            title: "death",
            lines: [
                {line: "In the age of loss, there is the dream of loss", poemNum: 6},
                {line: " I see the black ruins of my life, here, where I’ve spent so many years.", poemNum: 4},
                {line: "when we travel, we lose brothers at sea and do not stop to grieve.", poemNum: 7},
            ]
        }
    ],

    //A Poem is a title, author and body
    poems : [
        {
            title: "title of poem 1",
            author: "author of poem 1",
            body: "long body of poem unfortunately unformatted for now but it's okay this is a proof of concept"
        },
        {
            title: "title of poem 1",
            author: "author of poem 1",
            body: "long body of poem unfortunately unformatted for now but it's okay this is a proof of concept"
        },
        {
            title: "title of poem 1",
            author: "author of poem 1",
            body: "long body of poem unfortunately unformatted for now but it's okay this is a proof of concept"
        },
        {
            title: "title of poem 1",
            author: "author of poem 1",
            body: "long body of poem unfortunately unformatted for now but it's okay this is a proof of concept"
        },
        {
            title: "title of poem 1",
            author: "author of poem 1",
            body: "long body of poem unfortunately unformatted for now but it's okay this is a proof of concept"
        },
        {
            title: "title of poem 1",
            author: "author of poem 1",
            body: "long body of poem unfortunately unformatted for now but it's okay this is a proof of concept"
        },
        {
            title: "title of poem 1",
            author: "author of poem 1",
            body: "long body of poem unfortunately unformatted for now but it's okay this is a proof of concept"
        },
        {
            title: "title of poem 1",
            author: "author of poem 1",
            body: "long body of poem unfortunately unformatted for now but it's okay this is a proof of concept"
        },
        {
            title: "title of poem 1",
            author: "author of poem 1",
            body: "long body of poem unfortunately unformatted for now but it's okay this is a proof of concept"
        },
        {
            title: "title of poem 1",
            author: "author of poem 1",
            body: "long body of poem unfortunately unformatted for now but it's okay this is a proof of concept"
        },
        {
            title: "title of poem 1",
            author: "author of poem 1",
            body: "long body of poem unfortunately unformatted for now but it's okay this is a proof of concept"
        },
        {
            title: "title of poem 1",
            author: "author of poem 1",
            body: "long body of poem unfortunately unformatted for now but it's okay this is a proof of concept"
        }
    ]
}


// browserify support
if ( typeof module === 'object' ) {

	module.exports = PoemData;

}
