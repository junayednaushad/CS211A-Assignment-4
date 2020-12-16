function onKeyUp(event)
{
    if (event.key == 'a')
    {
        console.log("Got input a");
        shadingStyle = 0;
    }
    else if (event.key == 'g')
    {
        console.log("Got input g");
        shadingStyle = 1;
    }
    else if (event.key == 'p')
    {
        console.log("Got input p");
        shadingStyle = 2;
    } 
    else if (event.key == 'r')
    {
        console.log("Got input r"); 
        viewingAngle = (viewingAngle + 1) % 2;
    }

    
}

