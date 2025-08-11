function ShowUsername() {
  const username = localStorage.getItem("username");

  return (
    <div>
      <p style={{
        marginTop:"-2.5rem",
        marginRight:".5rem",
        fontWeight:"600",
        backgroundColor:"#fff",
        width:"7rem",
        textAlign:"center",
        height:"2rem",
        borderRadius:"10px",
        border:"1px solid #55a3f0"
      }} >Hi {username}</p>
    </div>
  );
}

export default ShowUsername;
