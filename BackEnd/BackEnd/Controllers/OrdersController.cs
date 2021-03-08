using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEnd.Repository.Models;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly MarceloDozDbContext _context;

        public OrdersController(MarceloDozDbContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
         public IActionResult GetOrders()
        {

            var orderList = _context.Orders.Select(o => new
            {
                o.OrderId,
                o.OrderSaleDate,
                o.OrderTotalPrice,
                o.Customer,
                
                OrderDetails = o.OrderDetails.Select(od => new
                {
                    od.OrderDetailUnitPrice,
                    od.OrderDetailQuantity,
                    od.Product
                }),
                o.Employee
            }).ToList();

            /*    var products = _context.Products
                    .Include("ProductsHasProviders")
                    .Include("Providers")
                    .ToList();*/

            //    var user = db.Rol.Include("Usuario").Include("Funcion")
            //      .Where(m => m.Usuario.Any(u => u.UserName == userName) && m.Funcion.Any(f => f.id_funcion == data)).FirstOrDefault();

            return Ok(orderList);
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrders([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var orders = await _context.Orders.FindAsync(id);

            if (orders == null)
            {
                return NotFound();
            }

            return Ok(orders);
        }

        // PUT: api/Orders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrders([FromRoute] int id, [FromBody] Orders orders)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != orders.OrderId)
            {
                return BadRequest();
            }

            _context.Entry(orders).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrdersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Orders
        [HttpPost]
        public async Task<IActionResult> PostOrders([FromBody] Orders orders)
        {
            try
            {
                Console.WriteLine(orders);
                //Orders table
                _context.Orders.Add(orders);

                //OrderDetails table
                foreach(var item in orders.OrderDetails)
                {
                    _context.OrderDetails.Add(item);
                }
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch(Exception ex)
            {
                throw ex;
            }
           /* if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrders", new { id = orders.OrderId }, orders);*/
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrders([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var orders = await _context.Orders.FindAsync(id);
            if (orders == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(orders);
            await _context.SaveChangesAsync();

            return Ok(orders);
        }

        private bool OrdersExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}