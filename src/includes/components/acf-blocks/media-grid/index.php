<section class="media-grid">
	<div class="media-grid__inner">
		<?php if ($rows = get_field('row')): ?>
			<?php foreach ($rows as $row): ?>
				<?php
				$unique_row_id = uniqid('row-');
				$fixed_height_class = $row['fixed_height'] ? 'fixed-height' : '';
				$cover_class = $row['cover'] ? 'cover' : '';
				?>
				<div class="media-grid__row row <?=$fixed_height_class . ' ' . $cover_class?>">
					<div class="sticky" id="<?=$unique_row_id;?>"></div>
					<?php foreach ($row['media'] as $item): ?>
						<?php
						$sticky = '';
						$image_sticky = '';
						$ratio = isset($item['file']['width']) ? $item['file']['height'] / $item['file']['width'] : '';
						$width = 100 / count($row['media']) . '%';
						$small_full = $item['small_full'] ? 'small-full' : '';
						if ($item['sticky']) {
							$sticky = 'data-scroll data-scroll-sticky data-scroll-target="#'.$unique_row_id.'"';
							$image_sticky = array(
								'data-scroll' 				=> '',
								'data-scroll-sticky' 	=> '',
								'data-scroll-target'	=> '#'.$unique_row_id,
							);
						}
						$sticky_class = $item['sticky'] ? 'media-grid__media--sticky' : '';
						?>
						<div class="media-grid__media <?=$sticky_class . ' ' . $small_full;?>" style="--ratio: <?=$ratio;?>; --width: <?=$width;?>">
							<?php if ($media = $item['file']): ?>
								<?php if ($media['subtype'] == 'mp4'): ?>
									<video src="<?=$media['url'];?>" autoplay muted loop playsinline <?=$sticky?>/></video>
								<?php else: ?>
									<?=wp_get_attachment_image($media['ID'], 'full', '', $image_sticky);?>
								<?php endif; ?>
							<?php endif; ?>
						</div>
					<?php endforeach; ?>
				</div>
			<?php endforeach; ?>
		<?php endif; ?>
	</div>
</section>
