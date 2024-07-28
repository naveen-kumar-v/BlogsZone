import { createPost, createUser, deletePost } from "@/utils/action"

export default function serveractiontest() {
  return (
    <>
      <form action={createPost} className="flex flex-col gap-5 w-96 text-black">
          <input type="text" placeholder="Title" name="title"/>
          <input type="text" placeholder="desc" name="desc"/>
          <input type="text" placeholder="slug" name="slug"/>
          <input type="text" placeholder="userId" name="userId"/>

          <button className="text-black px-4 py-1 rounded bg-white">Add post</button>
      </form>

      <form action={createUser} className="flex flex-col gap-5 w-96 text-black">
        <input type="text" placeholder="Name" name="username"/>
        <input type="text" placeholder="Email" name="email"/>
        <input type="text" placeholder="password" name="password"/>

        <button className="text-black px-4 py-1 rounded bg-white">Add user</button>
    </form>

    <form action={deletePost} className="flex flex-col gap-5 w-96 text-black">
        <input type="text" placeholder="Post id" name="id"/>

        <button className="text-black px-4 py-1 rounded bg-red-500">Delete user</button>
    </form>
    </>
  )
}
