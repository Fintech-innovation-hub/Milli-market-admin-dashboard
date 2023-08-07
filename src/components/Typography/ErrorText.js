function ErrorText({styleClass, children}){
    return(
        <p className={`text-center text-lg  text-error ${styleClass}`}>{children}</p>
    )
}

export default ErrorText