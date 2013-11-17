function delTabElement(oldTab, element)
{
	var newTab = new Array();

	for (i =0;i<oldTab.length; ++i)
	{
		if (oldTab[i] != element)
		{
			newTab.push(oldTab[i]);
		}
	}	

	return newTab;

} 
