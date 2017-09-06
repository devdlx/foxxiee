/* eslint-disable */
import {
  extendObservable,
  computed,
  map,
  toJS
} from 'mobx'


class StorageStore {


  constructor(firebase) {

    console.log('Storage Store', firebase)
    //     extendObservable(this, {
    //       loading: this.loading,
    //       active: this.active,
    //       url:this.url, playing:this.playing, volume: this.volume,
    //       played: this.played, loaded: this.loaded, duration:this.duration,
    //       playbackRate: this.playbackRate,
    //       tracks: this.tracks
    //     });
    this.firebase = firebase;
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.uploadsRef = firebase.database().ref('media')
    // Initiates Firebase auth and listen to auth state changes.
    this.auth.onAuthStateChanged(this.onAuthStateChanged);

  }


  signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new this.firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
  }

  onAuthStateChanged(user) {
    if (user) { // User is signed in!
      // Get profile pic and user's name from the Firebase user object.
      var profilePicUrl = user.photoURL; // Only change these two lines!
      var userName = user.displayName;
      this.user = user
    }
  }


  upload(fileInput) {
    console.log(fileInput.files)

    if (!fileInput.files.length) {
      console.error('Error, no files selected');
      return 'Error, no files selected';
    }

    var extCheck = /\.[0-9a-z]+$/i;


    let file = {
      file: {}
    }
    file.lastModifiedDate = fileInput.files[0].lastModifiedDate
    file.lastModified = fileInput.files[0].lastModified
    file.name = fileInput.files[0].name
    file.size = fileInput.files[0].size
    file.type = fileInput.files[0].type
    file.ext = file.name.match(extCheck)[0].toLowerCase()
    file.userId = 55555
    console.log(file)

    // Check if the file is an image.
    //   if (!file.type.match('image.*')) {
    //     var data = {
    //       message: 'You can only share images',
    //       timeout: 2000
    //     };
    //     this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
    //     return;
    //   }

    // Check if the user is signed-in
    //     if (this.checkSignedInWithMessage()) {

    // We add a message with a loading icon that will get updated with the shared image.
    //       var currentUser = this.auth.currentUser;

    //     return uploadItem;
    this.uploadsRef.push(file)
      .then((data) => {

        // Upload the image to Cloud Storage.
        var filePath = data.key // + file.ext
        console.log(filePath)
        var uploadTask = this.storage.ref(filePath).put(fileInput.files[0])

        uploadTask.on(this.firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case this.firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case this.firebase.storage.TaskState.RUNNING: // or 'running'
                //                 console.log('Upload is running');
                break;
            }
          },
          (error) => {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

              case 'storage/canceled':
                // User canceled the upload
                break;



              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            var downloadURL = uploadTask.snapshot.downloadURL;
            this.uploadsRef.child(filePath).update({
              url: downloadURL
            })
          });

        return uploadTask


      }).catch(function(error) {
        console.error('There was an error uploading a file to Cloud Storage:', error);
      });

    // Check if the user is signed-in 
    // }









  }




}
export default StorageStore