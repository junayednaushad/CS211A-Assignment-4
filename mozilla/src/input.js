function onKeyUp(event)
{
    if (event.key == 'a')
    {
        console.log("Got input g");
        shadingStyle = 0;
    }
    else if (event.key == 'g')
    {
        console.log("Got input b");
        shadingStyle = 1;
    }
    else if (event.key == 'p')
    {
        console.log("Got input a");
        shadingStyle = 2;
    }

    
}

