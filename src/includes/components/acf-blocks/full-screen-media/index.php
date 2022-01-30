<?php if ($media = get_field('media')): ?>
	<section class="full-screen-media">
		<?php
		$border_class = get_field('add_border') ? 'has-border' : '';
		$ratio = $media['height'] / $media['width'];
		?>
		<div class="full-screen-media__inner <?=$border_class;?>" style="--ratio: <?=$ratio;?>">
			<?php if ($media['subtype'] == 'mp4'):
				?>
				<video src="<?=$media['url'];?>" autoplay muted loop playsinline /></video>
			<?php else: ?>
				<?=wp_get_attachment_image($media['ID'], 'full');?>
			<?php endif; ?>
		</div>
	</section>
<?php endif; ?>
