import { ConsoleColor } from "./ConsoleColor.js";
import { NamedColors } from "./NamedColors.js";
import { OmniConsole } from "./OmniConsole.js";

export class App {
    public static async  Run(): Promise<void> {
        const oConsole = new OmniConsole(39, 27, "derp", true);
        oConsole.SetBackground(NamedColors.Black);
        oConsole.WriteLine("Test 123");

        oConsole.Write("S", NamedColors.Crimson, NamedColors.White);
        oConsole.WriteLine("pog", NamedColors.Yellow, NamedColors.Blue);
        oConsole.Back = NamedColors.DarkBlue;
        oConsole.Fore = NamedColors.White;
        oConsole.Echo = true;
        oConsole.EchoFormat = txt => `You typed: ${txt}`;
        let x=  await oConsole.ReadLine();

       // oConsole.Draw();
    }
}