<?php
/**
* Header
*
* @author       Cyd Stumpel
* @package      Wordpress
* @subpackage   portfolio2021
* @version      1.0
* @since        1.0
*/
?><!DOCTYPE html>
<html lang="nl">
<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head();?>
</head>
<?php
$style = '';
$data_attrs = '';
if ($post):
	$title = get_the_title();
else:
	$title = '';
endif;

if (get_post()) :
	$style = 'style="--background-color: '.get_field('background_color').'; --color: '.get_field('color').'"';
	$data_attrs = 'data-background="'.get_field('background_color').'" data-color="'.get_field('color').'" data-page-title="'.$title.'"';
endif; ?>
<body <?php body_class(); ?> <?=$style;?>>
<div class="cursor"></div>
<?php
$header_menu = get_menu_items_by_registered_slug( 'header_menu' );  // change 'header_menu' if you changed the menu location name
$latest_work = get_menu_items_by_registered_slug( 'latest_work' );  // change 'header_menu' if you changed the menu location name
if (!empty($header_menu)) {
$nav = array();
$children = array();
$parent_id = '';
$parent = '';
$counter = 0;
//===================
// Restructure menu array to your liking:
//===================
foreach ($header_menu as $menu_item) {
	if ($menu_item->menu_item_parent == 0) {
		array_push($nav, $menu_item);
		if ($parent_id !== $menu_item->ID) {
			$parent_id = $menu_item->ID;
			unset($children); // $children is gone
			$children = array();
		}
		$parent = $counter;
	} else {
		if ($parent_id == $menu_item->menu_item_parent) {
			array_push($children, $menu_item);
			if ($header_menu[$counter + 1]->menu_item_parent == 0 || $counter + 1 == count($header_menu)) {
				$header_menu[$parent]->children = $children;
			}
		}
	}
	$counter++;
}
?>
<?php
$title = '';
if ($post): ?>
	<?php $title = get_the_title();?>
<?php endif; ?>
<div class="header__page-title-container">
	<h1 class="header__page-title xlarge-body"><?=$title;?></h1>
</div>
<nav class="header">
	<div class="header__main">
		<a href="/" class="header__logo" aria-label="home">
			<?=svg('logo'); ?>
		</a>
		<div class="mobile-trigger">
			<span class="mobile-trigger__line"></span>
			<span class="mobile-trigger__line"></span>
		</div>
	</div>


	<div class="header__navigation row fraunces">
		<img class="header__image" src="" alt="" />
		<video class="header__video" src="" loop muted autoplay></video>
		<div class="header__left column small-full medium-12">
			<h3 class="header__title xsmall-body graphik">RECENT WORK:</h3>
			<ul class="header__list header__list--small">
				<?php
				foreach ($latest_work as $item) {
					$active = '';
					if ($post) {
						$active = $post->ID == $item->object_id ? 'active' : '';
					}
					?>
					<li class="header__item" data-type="image" data-media="<?=wp_get_attachment_image_url(get_post_thumbnail_id($item->object_id), 'full'); ?>">
						<a class="header__link small-heading <?=$active ?>" href="<?=$item->url ?>">
							<?=$item->title ?>
						</a>
					</li>
				<?php } ?>
			</ul>
		</div>
		<div class="header__right column small-full medium-8">
			<ul class="header__list">
				<?php
				foreach ($nav as $item) {
					$active = '';
					if ($post) {
						$active = $post->ID == $item->object_id ? 'active' : '';
					}
					$media = get_field('menu_image', $item);
					$media_type = 'image';
					$media_url = '';
					if ($media) {
						if ($media['type'] == 'video') {
							$media_type = 'video';
							$media_url = $media['url'];
						} else {
							$media_url = $media['sizes']['medium'];
						}
					}
					?>
					<li class="header__item" data-type="<?=$media_type;?>" data-media="<?=$media_url;?>">
						<a class="header__link large-heading <?=$active ?>" href="<?=$item->url ?>">
							<?=$item->title ?>
						</a>
					</li>
				<?php } ?>
			</ul>
		</div>
	</div>
</nav>
<?php } ?>

		<div data-router-wrapper>
			<div data-router-view="page" <?=body_class();?> <?=$style;?>>
				<div data-scroll-wrapper data-scroll-content class="smooth-scroll">
					<main data-scroll-container <?=$data_attrs;?> data-horizontal="true">
