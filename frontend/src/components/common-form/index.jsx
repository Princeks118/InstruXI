import { Button } from "../ui/button";
import FormControls from "./form-controls";

function CommonForm({
  handleSubmit,
  buttonText = "Submit",
  formControls = [],
  formData = {},
  setFormData = () => {},
  isButtonDisabled = false,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Render dynamic form fields */}
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />

      {/* Submit button */}
      <Button
        disabled={isButtonDisabled}
        type="submit"
        className="mt-5 w-full"
      >
        {buttonText}
      </Button>
    </form>
  );
}

export default CommonForm;
