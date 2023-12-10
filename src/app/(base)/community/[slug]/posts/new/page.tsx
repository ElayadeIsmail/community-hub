import CreatePostForm from '../../components/create-post-card';
import SlugCard from '../../components/slug-card';

interface Props {
	params: { slug: string };
}

const NewPostPage = ({ params }: Props) => {
	return (
		<section className='container grid grid-cols-4 gap-4 p-4'>
			<div className='col-span-3'>
				<CreatePostForm slug={params.slug} />
			</div>
			<SlugCard slug={params.slug} />
		</section>
	);
};

export default NewPostPage;
