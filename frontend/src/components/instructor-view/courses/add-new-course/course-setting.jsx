  import { useContext } from "react";
  import { InstructorContext } from "../../../../context/instrcutor-context";
  import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"
  import { Input } from "../../../ui/input"
  import { Label } from "../../../ui/label"
  import { mediaUploadeservice } from "../../../../services";
import { MediaProgressBarcomponent } from "../../../media-upload-progress-bar";


  function CourseSettings(){
    const {courseLandingFormData,
          setcourseLandingFormData,
          setmediaUplaodProgress,
          mediaUploadProgressPercentage,
         setmediaUploadProgressPercentage,
          mediaUplaodprogress,
      
        }=useContext(InstructorContext);
       console.log(courseLandingFormData);
        async function handleimageupload(event){
            const selectedimage=event.target.files[0];
            const imageformdata=new FormData();
            setmediaUplaodProgress(true);
            if(selectedimage) imageformdata.append('file',selectedimage);
                try { 
                    setmediaUplaodProgress(true);
                    const response=await mediaUploadeservice(imageformdata,setmediaUploadProgressPercentage);
                      console.log("image upload",response);
                      if(response.success){
                        setcourseLandingFormData({
                          ...courseLandingFormData,
                          image:response.data.url,
                        })
                      }
                    setmediaUplaodProgress(false);
                    } catch (error) {
                      console.log("error while uploading image");
                    }
            
        }      
        return (
        <Card>
          <CardHeader>
            <CardTitle>Course setting</CardTitle>
          </CardHeader>
          {
            mediaUplaodprogress? <MediaProgressBarcomponent isMediaUploading={mediaUplaodprogress} progress={mediaUploadProgressPercentage}/>:null
          }
          <CardContent>
            {
            courseLandingFormData?.image ?
            <img src={courseLandingFormData.image} />:
            <div className="flex flex-col gap-3">
              <Label>upload course image</Label>
              <Input
              type="file"
              accept="image/*"
              className="mb-4"
              onChange={handleimageupload}
              ></Input>
            </div>
            }
          </CardContent>
        </Card>
        )
  }

  export default CourseSettings