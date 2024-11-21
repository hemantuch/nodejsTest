
function isValidTitle(title) {
    console.log("title", title);
    if(title == undefined || title == '')  
    {
        return false;
    }

}

function isValidDescription(description) {
    console.log("title", description);

    if(description == undefined || description == '')      
        {

            return false;
        }  
}



const validation = { isValidTitle, isValidDescription };
export default validation;