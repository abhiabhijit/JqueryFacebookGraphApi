  $( document ).ready(function() {
    
    $("#Facebookfeed").hide();
    $("#Facebookprofile").hide();
    $("#goBackBtn").hide();
    $("#photos").hide();

  
    $("#facebookBtn1").on('click',function(){
        $("#Facebookfeed").hide("100");
        $("#Facebookprofile").show("100");
        $("#facebook").hide();
        $("#goBackBtn").show();
        
         var myFacebookToken = $("#apiid").val(); //accessing apiToken
    
        $.ajax('https://graph.facebook.com/me?fields=picture.width(250).height(250),id,name,first_name,last_name,birthday,about,hometown,languages,gender,education,work,relationship_status,family,website,email,cover.width(800).height(300)&access_token='+myFacebookToken,{

          success : function(response){
              console.log(response);
              console.log(typeof(response));
              // Cover photo
              $(".myCoverPic").attr("src", "" + response.cover.source + "");  
              
              // Profile photo
              $(".myProfilePic").attr("src", "" + response.picture.data.url + "");
              
              if(response.first_name){$("#myFirstName").text(response.first_name);}
                else{$("#myFirstName").text("Please provide info.");} 
              
              if(response.last_name){$("#myLastName").text(response.last_name);}
                else{$("#myLastName").text("Please provide info.");}
              if (response.name) {$("#myName").text(response.name);}
                else{$("#myName").text("Please provide info.");}
              

              $("#myProfileId").html('<a target="blank" href="https://facebook.com/'+response.id+'">https://facebook.com/'+response.id+'</a>');
              if(response.gender){$("#myGender").text(response.gender);}
                else{$("#myGender").text("Please provide info.");}
              if(response.birthday){$("#myBirthday").text(response.birthday);}
                else{$("#myBirthday").text("Please provide info.");}
              
              var languages = response.languages;
              var myLanguage = $.map(response.languages, function(index) {
                return index.name;
              });
              if (myLanguage=="") {$("#myLanguage").text("Please provide info.");}
                else{$("#myLanguage").text(myLanguage);}
              if (response.hometown.name) {$("#myHomeTown").text(response.hometown.name);}
                else{$("#myHomeTown").text("Please provide info.");}
             
              
              // Work and Education  
              var work = response.work;
              var myWork = $.map(work, function(index) {
                return index.employer.name;
              });
              if(myWork==""){$("#myWork").text("Please provide info.");
                
              }
              else{$("#myWork").text(myWork);}
              

              var education = response.education;
              var myEducation = $.map(education, function(index) {
                return index.school.name;
              });
              if (myEducation) {$("#myEducation").text(myEducation);}
                else{$("#myEducation").text("Please provide info.");}
              
      
              // Family and Relationship
              $("#myRelation").html(response.relationship_status);
              var family = response.family;
              var familyMembers=""
              var myFamily = $.map(family.data, function(value) {
                familyMembers+="# "+value.name
                
                
                console.log(value.name)
              });
              
              $("#myFamily").html(familyMembers);
             

              //Contact
              if (response.email) {$("#myEmail").text(response.email);}
                else{$("#myEmail").text("Please provide info.");}
              if (response.website) {$("#myWebsite").text(response.website);}
                else {$("#myWebsite").text("Please provide info.");}            
              

              
          }, // end of success      
                
          //error handling
          error: function(jqXHR) {
            alert(jqXHR.responseJSON.error.message + " Please reload the page and Enter valid API token");
          },
        });//end argument list end ajax call 
    });// end get facebookbtn1 info

    //Function for Button 2 for Feed info   
    $("#facebookBtn2").on('click',function(){

        $("#Facebookfeed").show();
        $("#Facebookprofile").hide();
        $("#facebook").hide();
        $("#goBackBtn").show();

        var myFacebookToken = $("#apiid").val();//call the api token from webpage
        
        $.ajax('https://graph.facebook.com/me?fields=name,posts{created_time,type,full_picture,story,message,source},picture.width(250).height(250),cover,likes&access_token='+myFacebookToken,{

            success : function(response){

              console.log(response);
              console.log(typeof(response));
              $("#myName2").text(response.name);

              // Cover photo
              $(".myCoverPic").attr("src", "" + response.cover.source + "");  
              
              // Profile photo
              $(".myProfilePic").attr("src", "" + response.picture.data.url + "");

              var postData = response.posts.data;
              
      
              let output='<h3 style="text-align:center;">Your Timeline Posts</h3>';
              var feeds = $.map(postData, function(value, index) {
                 output += `
              <div class="well">
                ${value.story} <span>${value.created_time}</span><br><br>`;

                
                
                console.log(value);
                if (value.type == "status") {
                  output +=`<div  style=""background-color": "white"
                "font-size": "200%"">${response.name} + " says : </br>" + ${value.message}</div></div>`
                
              }

              else if (value.type == "photo") {
                output+=`<div><img src=${value.full_picture} class="img-responsive" style="width:100% " alt="An image from your feed"></div></div>`
                
              }

              
              else if (value.type == "video") {
                output+=`<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="${value.source}" allowfullscreen></iframe>
</div></div>`


              }
              
              });
                     
          
              document.getElementById('feed').innerHTML = output;
              

              

          },
          error: function(jqXHR) {
            alert(jqXHR.responseJSON.error.message + " Please reload the page and Enter valid API token");
          }, //Success function completed
    });         
  });

    $("#goBackBtn").on("click",function(){
         $("#facebook").show("100");
        $("#Facebookfeed").hide();
        $("#Facebookprofile").hide();
        $("#goBackBtn").hide();
       


    });// end it card on click
});
  
