"use client";

type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className="text-red-600 font-medium">{message}</p>;
}
