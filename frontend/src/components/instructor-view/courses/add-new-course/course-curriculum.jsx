import { useContext } from "react";
import { InstructorContext } from "../../../../context/instrcutor-context";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Switch } from "../../../ui/switch";
import { Label } from "../../../ui/label";
import { courseCurriculumInitialFormData } from "../../../../config";
import {  mediadeleteeservice, mediaUploadeservice } from "../../../../services";
import { MediaProgressBarcomponent } from "../../../media-upload-progress-bar";
import { Videoplayer } from "../../../video-player/videoplayer";





function CourseCurriculum() {
  const {
    courseCurriculumFormData,
    setcourseCurriculumFormData,
    mediaUploadProgressPercentage,
    setmediaUploadProgressPercentage,
     mediaUplaodprogress,
      setmediaUplaodProgress,
  } = useContext(InstructorContext);

  function handleNewLecture(){
    
      setcourseCurriculumFormData([
        ...courseCurriculumFormData,
        {
         ...courseCurriculumInitialFormData[0]
        }
      ])
  }
  function handleCourseTitleChage(event,index){
    let cpy=[...courseCurriculumFormData]
    cpy[index]={
      ...cpy[index],
       title:event.target.value
    }
    console.log(cpy);
    setcourseCurriculumFormData(cpy);
  }
  function handleFreePreviewchange(value,index){
      let cpy=[...courseCurriculumFormData]
    cpy[index]={
      ...cpy[index],
       freePreview:value
    }
    console.log(cpy);
    setcourseCurriculumFormData(cpy);
  }
  async function handlesingleLectureUpload(event,index){
      console.log(event.target.files);
       const selectefile=event.target.files[0];
       const videoFormdata=new FormData();
      if(selectefile){
         videoFormdata.append('file',selectefile);
      }
      try {
        setmediaUplaodProgress(true);
        const response=await mediaUploadeservice(videoFormdata,setmediaUploadProgressPercentage);
        console.log("media upload",response);
        if(response.success){
           let cpy=[...courseCurriculumFormData]
          cpy[index]={
      ...cpy[index],
         videoUrl:response.data.url,
         public_id:response.data.public_id
         }
         setcourseCurriculumFormData(cpy);
         setmediaUplaodProgress(false);
        }
      } catch (error) {
        console.log("error while uploading meida");
      }
  }
  function iscoursecurriculumFormDataValid(){
     return courseCurriculumFormData.every(item=>{
        return item && typeof item=='object' &&
        item.title.trim()!==""&&
        item.videoUrl.trim()!==""
     })
  }
  async function handlereplacevideo(index){
     let cpy=[...courseCurriculumFormData];
     const currentvideopublicid=cpy[index].public_id;
     const deltecurrentmedia=await mediadeleteeservice(currentvideopublicid);
     console.log(deltecurrentmedia);
     if(deltecurrentmedia.success){
       cpy[index]={
        ...cpy[index],
        videoUrl:'',
        public_id:"",
       }
     }
     setcourseCurriculumFormData(cpy);
  }
  async function handledeletelecture(index){
      let cpy=[...courseCurriculumFormData];
      console.log(cpy[index]);
      const getcurrentselectedvideopublicid=cpy[index].public_id;
      const response=await mediadeleteeservice(getcurrentselectedvideopublicid);
      if(response.success){
         cpy=cpy.filter((_,idx)=> idx!=index);
         setcourseCurriculumFormData(cpy);
      }
  }
  return (

    <Card>
      <CardHeader>
        <CardTitle>Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button disabled={!iscoursecurriculumFormDataValid() || mediaUplaodprogress} onClick={handleNewLecture}>Add Lecture</Button>
        {
          mediaUplaodprogress? <MediaProgressBarcomponent isMediaUploading={mediaUplaodprogress} progress={mediaUploadProgressPercentage}/>:null
        }
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div key={index} className="space-y-3 border p-4 rounded-md">
              <h3 className="font-semibold">Lecture {index + 1}</h3>

              <Input
                name={`lecture-title-${index+1}`}
                placeholder="Enter lecture title"
                className="max-w-md"
                onChange={(event)=>handleCourseTitleChage(event,index)}
                value={courseCurriculumFormData[index].title}
              />

              <div className="flex items-center space-x-2">
                <Switch checked={courseCurriculumFormData[index].freePreview} onCheckedChange={(value)=>handleFreePreviewchange(value,index)} id={`free-preview-${index+1}`} />
                <Label htmlFor={`free-preview-${index+1}`}>Free Preview</Label>
              </div>
              <div className="mt-6">
                {
                  courseCurriculumFormData[index]?.videoUrl? 
                  <div className="flex gap-3">
                    <Videoplayer url={courseCurriculumFormData[index].videoUrl}/>
                    <Button onClick={()=>handlereplacevideo(index)}>Replace Video</Button>
                    <Button onClick={()=>handledeletelecture(index)} className="bg-red-800">Delete Lecture</Button>
                  </div>  :
                 <Card className="p-4">
                <Input type="file" accept="video/*" onChange={(event)=>handlesingleLectureUpload(event,index)} />
                  </Card>
                }

              </div>
              
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCurriculum;
