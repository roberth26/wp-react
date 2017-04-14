<html>
	<body>
		<table style="width:100%; border: 2px solid #c55b35; border-spacing: 0; line-height: 200%; color: white;">
			<thead>
				<tr style="background-color: #c55b35">
					<th style="padding: 10px; text-align: left; font-weight: normal; width: 120px">Field</th>
					<th style="padding: 10px; text-align: left; font-weight: normal">Data</th> 
				</tr>
			</thead>
			<tbody>
				<?php $index = 0; ?>
				<?php foreach( $form[ 'fields' ] as $field ) : ?>
					<tr style="background-color: <?= $index % 2 ? '#ff7746' : '#ff895e' ?>">
						<td style="padding: 10px"><?= $field[ 'name' ] ?></td>
						<td style="padding: 10px"><?= $field[ 'value' ] ?></td> 
					</tr>
					<?php $index++; ?>
				<?php endforeach; ?>
			</tbody>
		</table>	
	</body>
</html>