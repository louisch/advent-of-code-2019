fn meets_criteria(number: &u64) -> bool {
    let digits: Vec<u32> = number.to_string().chars().filter_map(|c| c.to_digit(10)).collect();
    let mut digits_clone = digits.clone();
    digits_clone.reverse();
    let mut matching = None;
    loop {
        let maybe_digit = digits_clone.pop();
        if let Some(digit) = maybe_digit {
            let mut count = 1;
            while let Some(next_digit) = digits_clone.pop() {
                if next_digit == digit {
                    count += 1;
                } else {
                    digits_clone.push(next_digit);
                    break;
                }
            }
            if count == 2 {
                matching = Some(digit);
            }
        } else {
            break;
        }
    }
    matching.is_some()
      && (&digits[..5]).iter().zip(&digits[1..]).all(|(d1, d2)| d1 <= d2)
}

fn main() {
    println!("found {}", (372304..847060).filter(|n| meets_criteria(n)).count());
}
