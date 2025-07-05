import { useContext } from "react";
import { courseLandingPageFormControls } from "../../../../config";
import FormControls from "../../../common-form/form-controls";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { InstructorContext } from "../../../../context/instrcutor-context";

function CourseLanding(){
    const {courseLandingFormData,
            setcourseLandingFormData}=useContext(InstructorContext);
      return (
       <Card>
        <CardHeader>
          <CardTitle>course lading page</CardTitle>
        </CardHeader>
        <CardContent>
          <FormControls
          formControls={courseLandingPageFormControls}
          formData={courseLandingFormData}
          setFormData={setcourseLandingFormData}
          />
        </CardContent>
        
       </Card>
      )
}

export default CourseLanding;