import { Label } from "../ui/label";
import { Input } from "../ui/input";

const name = "amount";
type FormInputNumberProps = {
  defaultValue?: number;
  name?: string;
};

function AmountInput({ defaultValue }: FormInputNumberProps) {
  return (
    <div className="mb-2">
      <Label htmlFor="amount" className="capitalize">
        Amount
      </Label>
      <Input
        id={name}
        type="number"
        name={name}
        min={0}
        defaultValue={defaultValue || 10}
        required
      />
    </div>
  );
}
export default AmountInput;
