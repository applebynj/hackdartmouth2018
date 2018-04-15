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
            title: "theme1",
            lines: [
                {line: "line from poem 1", poemNum: 1}, 
                {line: "line from poem 2", poemNum: 2}, 
                {line: "line from poem 3", poemNum: 3}, 
            ]
        },
        {
            title: "theme2",
            lines: [
                {line: "line from poem 4", poemNum: 4}, 
                {line: "line from poem 5", poemNum: 5}, 
                {line: "line from poem 6", poemNum: 6}, 
            ]
        },
        {
            title: "theme3",
            lines: [
                {line: "line from poem 7", poemNum: 7}, 
                {line: "line from poem 8", poemNum: 8}, 
                {line: "line from poem 9", poemNum: 9}, 
            ]
        },
        {
            title: "theme4",
            lines: [
                {line: "line from poem 10", poemNum: 10}, 
                {line: "line from poem 1", poemNum: 1}, 
                {line: "line from poem 2", poemNum: 2}, 
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