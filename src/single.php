<?php
/**
* Single post
*
* @author       Cyd Stumpel
* @package      Wordpress
* @subpackage   portfolio2021
* @version      1.0
* @since        1.0
*/

get_header();
the_post();
$slogan = wp_strip_all_tags(get_field('slogan'));
?>
<section class="page-header">
	<div class="page-header__inner">
		<div class="page-header__image">
			<?=wp_get_attachment_image(get_post_thumbnail_id(), 'full', false, array(
				'data-scroll' => '',
				'data-scroll-sticky' => '',
				'data-scroll-target' => 'main',
				'data-scroll-speed'	=> 1
			)); ?>
		</div>
		<div class="page-header__title-container">
			<h1 class="page-header__title page-header__title--outline xxlarge-heading"><?=$slogan; ?></h1>
		</div>
		<div class="page-header__title-container page-header__title-container--clip">
			<h1 class="page-header__title xxlarge-heading"><?=$slogan; ?></h1>
		</div>
	</div>
</section>
<?php
the_content();
$args = array(
	'post_type' => 'case',
	'fields' 		=> 'ids',
	'numberposts' => -1
);

$items = get_posts($args);
$adjacent = '';
$key = array_search(get_the_id(), $items);

if ($key == count($items) - 3) {
	$adjacent = array(
		$items[$key + 1],
	);
} else if ($key == count($items) - 2) {
	$adjacent = array(
		$items[$key + 1],
	);
} else if ($key == count($items) - 1) {
		$adjacent = array(
			$items[0],
		);
	}
else {
	$adjacent = array(
		$items[$key + 1],
	);
}

echo get_template_part('includes/components/partials/homepage-grid', '', array('items' => $adjacent, 'meta' => 'Next case'));
get_footer();
