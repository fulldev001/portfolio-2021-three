<?php if ($grid = get_field('grid')) : ?>
	<div data-scroll-section>
		<?=get_template_part('includes/components/partials/homepage-grid', '', array('items' => $grid, 'meta' => 'Case'));?>
	</div>
<?php endif; ?>
