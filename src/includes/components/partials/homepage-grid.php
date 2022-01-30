<?php
$items = $args['items'];
$meta = $args['meta'];
?>

<section class="homepage-grid">
	<div class="homepage-grid__inner" data-scroll data-scroll-sticky data-scroll-target=".homepage-grid">
		<div class="homepage-grid__row" style="--items: <?=ceil(count($items) / 3)?>">
			<?php foreach ($items as $i => $item) :
				$slogan = str_replace("'", '’', get_field('slogan', $item));
				?>
				<div class="homepage-grid__item" data-color="<?=get_field('background_color', $item); ?>">
					<div class="homepage-grid__image">
						<?php
						$post_thumbnail = get_post_thumbnail_id($item);
						?>
						<?=wp_get_attachment_image($post_thumbnail, 'full', '', array('class' => 'js-image'));?>

					</div>
					<div class="homepage-grid__description">
						<a href="<?=get_the_permalink($item); ?>" draggable="false" class="homepage-grid__link">
							<p class="homepage-grid__meta font-medium xsmall-body"><span class="opacity"><?=$meta;?></span>  — <?=get_the_title($item); ?></p>
							<h2 class="fraunces home-heading">
								<?=$slogan;?>
							</h2>
						</a>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>
