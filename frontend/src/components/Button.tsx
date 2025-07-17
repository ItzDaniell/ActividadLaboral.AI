import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  customClass?: string
  children: ReactNode
}

const Button = ({
  type = "button",
  customClass = "",
  onClick,
  disabled = false,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 text-black cursor-pointer ${customClass}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button