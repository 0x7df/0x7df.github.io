var testJavaScript = function() {
    confirm('This is an example of using JS to create some interaction on a website. Click OK to continue!');
    
    var age = prompt("What's your age?");
    if (age < 18) {
        console.log("OK, but...");
    } else {
        console.log("Crack on");
    }
}