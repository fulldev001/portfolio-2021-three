<?php
/**
 * Footer
 *
* @author       Cyd Stumpel
 * @package      Wordpress
 * @subpackage   portfolio2021
 * @version      1.0
 * @since        1.0
 */
?>

					<footer class="footer">
						<div class="footer__inner row">
							<p class="xsmall-body">
								© Cyd Stumpel <?=Date('Y')?>. Freelance Creative Developer
							</p>
						</div>
					</footer>
				</main>
			</div>
		</div>
	</div>
	<div id="container"></div>
	<div class="page-transition"></div>

	<div class="footer--fixed row">
		<?php
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
		<div class="footer__socials">
			<?php
			foreach ($links as $link) {
				?>
				<div class="touchpoint">
					<a target="_blank" rel="noopener" class="contact__link font-medium" href="<?php echo $link['url']; ?>" aria-label="<?php echo $link['iconName'] ?>">
						<?php echo svg($link['iconName']); ?>
					</a>
				</div>
				<?php
			}
			?>
		</div>
		<p class="footer-text font-medium">
			<a class="xsmall-body" href="mailto:info@cydstumpel.nl" target="_blank">Available for freelance development work <?=svg('send');?></a>
		</p>
	</div>

		<?php wp_footer(); ?>
	</body>
</html>
