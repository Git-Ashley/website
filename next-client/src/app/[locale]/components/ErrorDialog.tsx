import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"

export const ErrorDialog = ({ open }: { readonly open: boolean }) => (
  <Dialog open={open}>
    <DialogContent>
      <DialogHeader>
        <DialogDescription>
          Disconnected. Attepmting to reconnect...
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
)