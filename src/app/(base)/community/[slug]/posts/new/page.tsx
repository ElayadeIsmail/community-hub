import CreatePostForm from '../../components/create-post-card';

interface Props {
	params: { slug: string };
}

const NewPostPage = ({ params }: Props) => {
	return <CreatePostForm slug={params.slug} />;
};

export default NewPostPage;
