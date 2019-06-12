function getIGPics(user) {
  
  user = "<INSERT_IG_UN_HERE>";
  
  var url = "https://www.instagram.com/u/?__a=1";
  
  var result = UrlFetchApp.fetch(url.replace("u", user), {
    muteHttpExceptions: true
  });
  //Logger.log(result);
  
  if (result.getResponseCode() === 200) {
   var data = JSON.parse(result.getContentText());
   //Logger.log(data.graphql.user.edge_owner_to_timeline_media.edges[1].node.display_url);
   
   //below, use the parsed out JSON response in the Logger.log above ^^
   //OR, you can go to instagram.com, right click on image and Inspect, then insert image URL below
   var photoData = data.graphql.user.edge_owner_to_timeline_media.edges || 'https:// ...';
   //Logger.log(photoData);
   
   var picBlob = UrlFetchApp.fetch(photoData).getBlob();
   //Logger.log(picBlob.getName());
   var name = picBlob.getName();
   
   var destFolder = DriveApp.getFoldersByName('IG: scraped pics').next();
   var end = destFolder.createFile(picBlob);
   
   } else {
     Logger.log("User not found");
     return null;
  } 
}
