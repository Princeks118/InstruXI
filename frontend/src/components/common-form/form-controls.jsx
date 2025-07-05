import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

function FormControls({ formControls = [], formData = {}, setFormData = () => {} }) {
  function renderComponentByType(controlItem) {
    const value = formData[controlItem.name] ?? "";

    switch (controlItem.componentType) {
      case "input":
        return (
          <Input
            id={controlItem.name}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            type={controlItem.type || "text"}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [controlItem.name]: e.target.value })
            }
          />
        );

      case "select":
        return (
          <Select
            onValueChange={(val) =>
              setFormData({ ...formData, [controlItem.name]: val })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={controlItem.placeholder || controlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {controlItem.options?.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            id={controlItem.name}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [controlItem.name]: e.target.value })
            }
          />
        );

      default:
        return (
          <Input
            id={controlItem.name}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            type={controlItem.type || "text"}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [controlItem.name]: e.target.value })
            }
          />
        );
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {formControls.map((controlItem) => (
        <div key={controlItem.name} className="space-y-1">
          {controlItem.label && (
            <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
          )}
          {renderComponentByType(controlItem)}
        </div>
      ))}
    </div>
  );
}

export default FormControls;
