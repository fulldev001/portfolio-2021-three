<section class="case-details">
		<?php if (get_post_type() == 'case'): ?>
			<h2 class="fraunces xxlarge-heading">
				<?=get_the_title();?>
			</h2>
		<?php endif; ?>
	<div class="case-details__inner row">
		<?php if ($details = get_field('detail')): ?>
			<div class="case-details__details">
				<?php foreach ($details as $detail): ?>
					<div class="case-details__detail" data-scroll>
						<p class="font-medium"><?=$detail['title'];?></p>
						<div class="detail"><?=$detail['value'];?></div>
					</div>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
		<div class="p">
			<div class="case-details__intro xlarge-body" data-scroll>
				<?=get_field('intro_text');?>
			</div>
		</div>
	</div>
</section>
