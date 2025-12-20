def resistor_calculator():
    # Data mapping for colors
    digits = {
        "black": 0, "brown": 1, "red": 2, "orange": 3, "yellow": 4,
        "green": 5, "blue": 6, "violet": 7, "gray": 8, "white": 9
    }

    multipliers = {
        "black": 1, "brown": 10, "red": 100, "orange": 1000, 
        "yellow": 10000, "green": 100000, "blue": 1000000,
        "gold": 0.1, "silver": 0.01
    }

    tolerances = {
        "brown": "1%", "red": "2%", "green": "0.5%", "blue": "0.25%",
        "violet": "0.1%", "gray": "0.05%", "gold": "5%", "silver": "10%"
    }

    print("--- Resistor Color Code Calculator (4-Band) ---")
    try:
        # User Inputs
        b1 = input("Enter Band 1 color (e.g., brown): ").lower().strip()
        b2 = input("Enter Band 2 color (e.g., black): ").lower().strip()
        b3 = input("Enter Band 3 (Multiplier) color (e.g., red): ").lower().strip()
        b4 = input("Enter Band 4 (Tolerance) color (e.g., gold): ").lower().strip()

        # Calculation
        val = (digits[b1] * 10 + digits[b2]) * multipliers[b3]
        tol = tolerances[b4]

        # Formatting Output
        if val >= 1000000:
            display_val = f"{val / 1000000} MΩ"
        elif val >= 1000:
            display_val = f"{val / 1000} kΩ"
        else:
            display_val = f"{val} Ω"

        print(f"\nTotal Resistance: {display_val} ±{tol}")

    except KeyError as e:
        print(f"\nError: Invalid color entered ({e}). Please check your spelling.")

if __name__ == "__main__":
    resistor_calculator()
