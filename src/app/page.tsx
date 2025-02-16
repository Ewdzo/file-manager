"use client"

export default function Home() {
  const handleChange = (e: any) => {
    e.preventDefault();
    console.log("From onUploadFile");
  }

  return (
    <main>
      <form action="/api/upload" encType="multipart/form-data" method="post">
        <div>File: <input type="file" name="uploads" /></div>
        <input type="submit" value="Send File" />
      </form>
    </main>
  );
}
