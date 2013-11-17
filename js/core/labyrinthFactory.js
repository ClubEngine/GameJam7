function labyrinthFactory(idLabyrinth)
{
	var fileContent=document.getElementById(idLabyrinth).innerHTML;

	// getWidth	
	var width=fileContent.substring(0,fileContent.indexOf('\n'));
	var fileContent=fileContent.substring(fileContent.indexOf('\n')+1);

	// getHeiht	
	var height=fileContent.substring(0,fileContent.indexOf('\n'));
	var fileContent=fileContent.substring(fileContent.indexOf('\n')+1);

	//	create labyrinth
	var labyrinth=new Labyrinth(width, height);
		

	for(var i=0; i<height; ++i)
	{
		for(var j=0; j<width; ++j)
		{
			labyrinth.set(j, i,fileContent.substring(j+1,j+2));
		}

		var fileContent=fileContent.substring(fileContent.indexOf('\n')+1);
	}
	 	
	return labyrinth;
}
