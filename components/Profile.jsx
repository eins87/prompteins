import PromptCard from "@components/PromptCard";

const Profile = ({ name, desc, data, dataComments, handleEdit, handleDelete }) => {
  return (
    <>
      <h1 className="text-left head_text">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="text-left desc">
        {desc}
      </p>

      <div className='mt-10 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            filterComment={dataComments.filter((comment) => comment.prompt === post._id)}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </>
  )
}

export default Profile