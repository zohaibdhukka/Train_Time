$(document).ready(function(){

    
    
    
    
    
    $("#submit-btn").on("click", function(event){
        event.preventDefault();
        
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val();
        var firstTrainTime = $("#firstTrainTime").val();
        var frequency = $("#frequency").val();

        
        
        $(".trainName").append(trainName);
        
    })
})