

export const Button = ({disabled,children, handleClick, classes, variant, type}) => {
    return (
        <>
            <button
                onClick={handleClick && handleClick}
                className={`
                    btn 
                    ${classes && classes} 
                    ${variant === 'primary' && 'btn-primary'}
                    ${variant === 'success' && 'btn-success'}
                    ${variant === 'danger' && 'btn-danger'}
                    ${variant === 'secondary' && 'btn-secondary'}
                `}
                type={type}
                disabled={disabled ? disabled : false}
            >
                {children}
            </button>
        </>
    )
}