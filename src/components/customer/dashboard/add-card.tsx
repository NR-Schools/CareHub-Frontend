"use client";
import CardForm from "@/components/customer/dashboard/card-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AddCard = () => {
  return (
    <div className="place-self-center pb-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="max-w-xs bg-custom-green hover:bg-custom-action">
            Add Request
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Make new Request</DialogTitle>
            <DialogDescription>
              Make new requests here. Click Submit when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-4">
              <CardForm />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCard;
