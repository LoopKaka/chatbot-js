const MessageRow = (props) => {
  const { role, content } = props;

  return (
    <>
      <div className={`message-row ${role === "user" ? "user" : ""}`}>
        <div className={`${role === "user" ? "user-bubble" : "assistant"}`}>
          {content}
        </div>
      </div>
    </>
  );
};

export default MessageRow;
