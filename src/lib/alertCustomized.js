import { toast } from "sonner";

export function alertError({ title, description }) {
  toast.error(title, {
    description,
    closeButton: true,
    richColors: true,
  });
}

export function alertLoading({ title, description }) {
  return toast.loading(title, {
    description,
    richColors: true,
  });
}

export function alertSuccess({ title, description, id }) {
  return toast.success(title, {
    description,
    richColors: true,
    id,
  });
}
