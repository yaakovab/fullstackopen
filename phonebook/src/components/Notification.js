
const Notification = ({ message }) => {
    if (message === null)
        return null

    return (
        <div className={message ? (message.startsWith('Added') || message.startsWith('Updated') ? "successMessage" : "failMessage") : null}>
            {message}
        </div>
    )
}

export default Notification