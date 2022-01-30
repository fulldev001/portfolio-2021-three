<?php
/**
* Template Name: Contact Template
*/


get_header();
the_post();
the_content();
$links = array(
	array(
		'iconName' => 'codepen',
		'url' => 'https://codepen.io/Sidstumple',
		'text' => 'sidstumple'
	),
	array(
		'iconName' => 'twitter',
		'url' => 'https://twitter.com/cydstumpel',
		'text' => 'cydstumpel'
	),
	array(
		'iconName' => 'github',
		'url' => 'https://github.com/Sidstumple',
		'text' => 'sidstumple'
	),
	array(
		'iconName' => 'linkedin',
		'url' => 'https://www.linkedin.com/in/cydstumpel/',
		'text' => 'cydstumpel'
	),
	array(
		'iconName' => 'instagram',
		'url' => 'https://www.instagram.com/cydstumpel/',
		'text' => 'cydstumpel'
	),
);
?>
<div class="row contact center">
	<section class="column small-full medium-20 large-15 contact__text">
		<h1 class="column small-full medium-18">Want to work with me?</h1>
		<div class="p large column small-full medium-16">
			<p>
				<a href="mailto:<?=get_field('email', 'options');?>">Get in touch with me by email</a>
			</p>
		</div>

		<p class="larger">
			You can also follow me from a distance:
		</p>
		<div class="contact__links">
			<?php
			foreach ($links as $link) {
				?>
				<div class="touchpoint">
					<a target="_blank" class="contact__link font-medium" href="<?php echo $link['url']; ?>">
						<?php echo svg($link['iconName']); ?>
						<?php echo $link['text'] ?>
					</a>
				</div>
				<?php
			}
			?>
		</div>
	</section>
</div>
<?php
get_footer();


?>
